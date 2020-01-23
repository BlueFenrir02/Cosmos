module.exports = {
	name: 'hello',
    description: 'Replies with "Hello!"',
    args: false,
    usage: '',
	execute(message, args) {
		message.channel.send('Hello!');
	}
};