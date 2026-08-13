// Immutable domain model for the Review entity.

/**
 * A frozen Review record identified by a stable integer id.
 */
export class Review {
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
   * @returns {Review}
   */
  rename(name) {
    return new Review({ ...this, name });
  }

  /**
   * Return a copy with the amount replaced.
   * @param {number} amountCents
   * @returns {Review}
   */
  withAmount(amountCents) {
    return new Review({ ...this, amountCents });
  }

  /**
   * Return an inactive copy of this record.
   * @returns {Review}
   */
  deactivate() {
    return new Review({ ...this, active: false });
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
    return `Review(#${this.id}, ${this.name}, ${state})`;
  }
}
