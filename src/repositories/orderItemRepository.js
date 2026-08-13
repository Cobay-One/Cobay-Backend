// In-memory repository for OrderItem records.
// Stores OrderItem instances; see ../domain/orderItem.js.

/**
 * A simple in-memory store keyed by the record id.
 */
export class OrderItemRepository {
  constructor() {
    /** @type {Map<number, OrderItem>} */
    this._items = new Map();
  }

  /**
   * Insert or replace a record.
   * @param {OrderItem} item
   */
  add(item) {
    this._items.set(item.id, item);
  }

  /**
   * Return the record for itemId, or null when absent.
   * @param {number} itemId
   * @returns {OrderItem | null}
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
   * @returns {OrderItem[]}
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
