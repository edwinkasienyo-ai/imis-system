const Message = require("./message.model");

// ==========================
// SEND MESSAGE
// ==========================
exports.sendMessage = async (req, res) => {
  try {
    const { audience, message, mode } = req.body;

    if (!audience || !message || !mode) {
      return res.status(400).json({
        message: "All fields required ❌",
      });
    }

    const msg = await Message.create({
      senderId: req.user.id,
      institutionId: req.user.institutionId,
      audience,
      message,
      mode,
      status: "SENT",
    });

    return res.json({
      message: "Message sent successfully ✅",
      data: msg,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error sending message ❌",
      details: error.message,
    });
  }
};

// ==========================
// GET MESSAGES
// ==========================
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: {
        institutionId: req.user.institutionId,
      },
    });

    return res.json(messages);

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching messages ❌",
      details: error.message,
    });
  }
};