// In-memory repository for ReturnRequest records.
// Stores ReturnRequest instances; see ../domain/returnRequest.js.

/**
 * A simple in-memory store keyed by the record id.
 */
export class ReturnRequestRepository {
  constructor() {
    /** @type {Map<number, ReturnRequest>} */
    this._items = new Map();
  }

  /**
   * Insert or replace a record.
   * @param {ReturnRequest} item
   */
  add(item) {
    this._items.set(item.id, item);
  }

  /**
   * Return the record for itemId, or null when absent.
   * @param {number} itemId
   * @returns {ReturnRequest | null}
   */
  get(itemId) {
    return this._items.get(itemId) ?? null;
  }

  /**
   * Remove a record, returning true when it existed.
   * @param {number} itemId
   * @returns {boolean}
   */
  remove(itemId) {
    return this._items.delete(itemId);
  }

  /**
   * Return every stored record.
   * @returns {ReturnRequest[]}
   */
  listAll() {
    return [...this._items.values()];
  }

  /**
   * Remove all stored records.
   */
  clear() {
    this._items.clear();
  }

  /**
   * Return whether a record with itemId exists.
   * @param {number} itemId
   * @returns {boolean}
   */
  has(itemId) {
    return this._items.has(itemId);
  }

  /**
   * Return the number of stored records.
   * @returns {number}
   */
  get size() {
    return this._items.size;
  }
}
