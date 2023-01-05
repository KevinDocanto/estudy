const { Server } = require('socket.io');
const io = new Server();
const db = require('../models');
const { User, Room, RoomChat } = db;

var Socket = {
  emit: function (event, data) {
    io.sockets.emit(event, data);
  },
};

io.on('connection', function (socket) {
  const userId = socket.handshake.query.userId;
  const roomId = socket.handshake.query.roomId;
  socket.on('disconnect', async () => {
    if (userId === 'undefined') {
      return;
    }
    await User.update(
      {
        role: null,
        roomId: null,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    const room = await Room.findByPk(roomId);
    await room.decrement('numOfUsers');
    if (room.numOfUsers <= 0) {
      RoomChat.destroy({
        where: {
          roomId: roomId,
        },
      });
      room.destroy();
    }
    Socket.emit(`user${roomId}`);
  });
});

exports.Socket = Socket;
exports.io = io;
