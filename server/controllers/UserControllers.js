const registerUser = async (req, res) => {
    const { name, email, password, pic } = req.body;

    // Send to user
    res.json({
        name,
        email,
    });
};

export { registerUser };
