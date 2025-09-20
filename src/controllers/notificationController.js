import Notification from "../models/NotificationModel.js";

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notif = await Notification.findById(req.params.id);

    if (!notif) return res.status(404).json({ error: "Notification not found" });
    if (notif.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not allowed" });
    }

    notif.isRead = true;
    await notif.save();

    res.json({ message: "Notification marked as read", notif });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
