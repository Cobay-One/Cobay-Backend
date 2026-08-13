// In-memory repository for Invoice records.
// Stores Invoice instances; see ../domain/invoice.js.

/**
 * A simple in-memory store keyed by the record id.
 */
export class InvoiceRepository {
  constructor() {
    /** @type {Map<number, Invoice>} */
    this._items = new Map();
  }

  /**
   * Insert or replace a record.
   * @param {Invoice} item
   */
  add(item) {
    this._items.set(item.id, item);
  }

  /**
   * Return the record for itemId, or null when absent.
   * @param {number} itemId
   * @returns {Invoice | null}
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
   * @returns {Invoice[]}
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
