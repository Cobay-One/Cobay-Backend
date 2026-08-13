// Immutable domain model for the TrackingEvent entity.

/**
 * A frozen TrackingEvent record identified by a stable integer id.
 */
export class TrackingEvent {
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
   * @returns {TrackingEvent}
   */
  rename(name) {
    return new TrackingEvent({ ...this, name });
  }

  /**
   * Return a copy with the amount replaced.
   * @param {number} amountCents
   * @returns {TrackingEvent}
   */
  withAmount(amountCents) {
    return new TrackingEvent({ ...this, amountCents });
  }

  /**
   * Return an inactive copy of this record.
   * @returns {TrackingEvent}
   */
  deactivate() {
    return new TrackingEvent({ ...this, active: false });
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
    return `TrackingEvent(#${this.id}, ${this.name}, ${state})`;
  }
}
