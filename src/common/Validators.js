export default class Validators {
  static isChannelNameValid(channels, newChannelName) {
    return channels.some(({ name }) => name === newChannelName);
  }
}
