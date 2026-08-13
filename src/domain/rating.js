// Immutable domain model for the Rating entity.

/**
 * A frozen Rating record identified by a stable integer id.
 */
export class Rating {
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
   * @returns {Rating}
   */
  rename(name) {
    return new Rating({ ...this, name });
  }

  /**
   * Return a copy with the amount replaced.
   * @param {number} amountCents
   * @returns {Rating}
   */
  withAmount(amountCents) {
    return new Rating({ ...this, amountCents });
  }

  /**
   * Return an inactive copy of this record.
   * @returns {Rating}
   */
  deactivate() {
    return new Rating({ ...this, active: false });
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
    return `Rating(#${this.id}, ${this.name}, ${state})`;
  }
}
