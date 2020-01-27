// Command
module.exports = {
	name: 'hello',
    description: 'Replies with "Hello!"',
    args: false,
    usage: '',
	execute(message) {
		// Execute
		message.channel.send('Hello!');
	}
}; 