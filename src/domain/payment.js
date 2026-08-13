// Immutable domain model for the Payment entity.

/**
 * A frozen Payment record identified by a stable integer id.
 */
export class Payment {
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
   * @returns {Payment}
   */
  rename(name) {
    return new Payment({ ...this, name });
  }

  /**
   * Return a copy with the amount replaced.
   * @param {number} amountCents
   * @returns {Payment}
   */
  withAmount(amountCents) {
    return new Payment({ ...this, amountCents });
  }

  /**
   * Return an inactive copy of this record.
   * @returns {Payment}
   */
  deactivate() {
    return new Payment({ ...this, active: false });
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
    return `Payment(#${this.id}, ${this.name}, ${state})`;
  }
}
