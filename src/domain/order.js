// Immutable domain model for the Order entity.

/**
 * A frozen Order record identified by a stable integer id.
 */
export class Order {
  /**
   * @param {{ id: number, name: string, amountCents?: number, active?: boolean }} attrs
   */
  constructor({ id, name, amountCents = 0, active = true }) {
    this.id = id;
    this.name = name;
    this.amountCents = amountCents;
    this.active = active;
    Object.freeze(this);
  }

  /**
   * Return a copy of this record with a new name.
   * @param {string} name
   * @returns {Order}
   */
  rename(name) {
    return new Order({ ...this, name });
  }

  /**
   * Return a copy with the amount replaced.
   * @param {number} amountCents
   * @returns {Order}
   */
  withAmount(amountCents) {
    return new Order({ ...this, amountCents });
  }

  /**
   * Return an inactive copy of this record.
   * @returns {Order}
   */
  deactivate() {
    return new Order({ ...this, active: false });
  }

  /**
   * Return true when the amount is zero.
   * @returns {boolean}
   */
  isFree() {
    return this.amountCents === 0;
  }

  /**
   * Return a human-readable label for logs and displays.
   * @returns {string}
   */
  label() {
    const state = this.active ? "active" : "inactive";
    return `Order(#${this.id}, ${this.name}, ${state})`;
  }
}
