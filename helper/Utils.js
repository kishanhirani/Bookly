class Utils {

    static Required(data, title, res) {
        if (data == "" || data == undefined || data == "") {
            return res.status(400).json({ message: title + "is required", success: false });

        }

    }
}

module.exports = { Utils }