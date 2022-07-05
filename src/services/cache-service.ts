/**
 * Caches the response of any promise value of a loading function and prevents duplicate calls
 * @author Mike Reiche <mike.reiche@t-systems.com>
 */
export class CacheService {
    private _cacheContainer = new Map<string, Entry<any>>();
    private _defaultCacheTtlSeconds = 10;

    /** If a live entry exists, returns the (possibly still pending) result of said entry.
     *  Otherwise, invokes {@link loadingFunction} and creates a new entry for it.
     *  The returned Promise is already primed by call to {@link Promise#then}.
     *  <p>The TTL of an entry only begins when the Promise resolves.</p>
     */
    getForKeyWithLoadingFunction <T> (
        key:string,
        loadingFunction:() => Promise<T>,
        cacheTtlSeconds = this._defaultCacheTtlSeconds
    ):Promise<T> {
        const entry: Entry<T> | undefined = this._cacheContainer.get(key);
        let result = entry?.read(cacheTtlSeconds)
        if (!result) {
            const request = loadingFunction()
            this._cacheContainer.set(key, new Entry<T>(request))
            result = request
        }
        return result
    }

    setDefaultCacheTtl(seconds:number) {
        this._defaultCacheTtlSeconds = seconds;
        return this;
    }

    invalidate(keys:string[]) {
        for (const key of keys) {
            const entry = this._cacheContainer.get(key)
            entry?.destructor()
            this._cacheContainer.delete(key)
        }
        return this;
    }

    /** @deprecated {@link Entry#read} dies on its own. */
    get outdatedKeys() {
        const now = nowInSeconds()
        const keys: string[] = [];
        for (const entry of this._cacheContainer.entries()) {
            if (entry[1].isAlive(this._defaultCacheTtlSeconds, now)) {
                keys.push(entry[0]);
            }
        }
        return keys;
    }

    get cacheKeys() {
        return this._cacheContainer.keys()
    }

    invalidateAll() {
        this._cacheContainer.forEach(entry => entry.destructor())
        this._cacheContainer = new Map<string, Entry<any>>()
        return this;
    }
}

function nowInSeconds(): number {
    return Date.now() / 1000
}

enum EntryState {
    DEAD = 0, // falsy
    WAITING,
    WRITTEN,
}

export class Entry<T> {
    private state: EntryState = EntryState.WAITING
    /** Will only be set once the source has been resolved. */
    private startOfLife: number | null = null
    private value: Promise<T> | T

    constructor(source: Promise<T>) {
        this.value = source.then(result => this.write(result))
    }

    // FIXME ES2021: https://stackoverflow.com/a/71820676/3434465
    destructor(): void {
        this.write = result => result // will NOP when source finally resolves
        this.state = EntryState.DEAD
    }

    // TODO: make private or inline when removing CacheService.outdatedKeys
    /** An entry is alive until it has been resolved and its TTL has since passed. */
    isAlive(lifespan: number, now = nowInSeconds()): boolean {
        switch (this.state) {
            case EntryState.WRITTEN:
                return this.startOfLife + lifespan >= now
            default:
                return !!this.state
        }
    }

    /** @return <code>false</code> if TTL has been passed */
    read(lifespan: number): Promise<T> | false {
        if (this.isAlive(lifespan)) {
            return Promise.resolve(this.value)
        }
        else {
            this.destructor()
            return false
        }
    }

    /** Replaces the source Promise with its resolved value (so we can keep returning resolving Promises) and starts TTL.
     *  Will be replaced by {@link #destructor} with a NOP, such that the source Promise resolving after the Entry was invalidated does not cause an invalid state.
     */
    private write(result: T): T {
        this.value = result // to be wrapped in fresh Promises, so we can read it more than once
        this.state = EntryState.WRITTEN
        this.startOfLife = nowInSeconds()
        return result
    }
}
