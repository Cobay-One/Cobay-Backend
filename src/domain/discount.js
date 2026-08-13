// Immutable domain model for the Discount entity.

/**
 * A frozen Discount record identified by a stable integer id.
 */
export class Discount {
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
   * @returns {Discount}
   */
  rename(name) {
    return new Discount({ ...this, name });
  }

  /**
   * Return a copy with the amount replaced.
   * @param {number} amountCents
   * @returns {Discount}
   */
  withAmount(amountCents) {
    return new Discount({ ...this, amountCents });
  }

  /**
   * Return an inactive copy of this record.
   * @returns {Discount}
   */
  deactivate() {
    return new Discount({ ...this, active: false });
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
    return `Discount(#${this.id}, ${this.name}, ${state})`;
  }
}
