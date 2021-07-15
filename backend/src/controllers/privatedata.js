const getPrivateData = (req, res, next) => {
    res.status(200).json({
        succes: true,
        data: 'You get access to the private data in this route ',
    });
};

module.exports = getPrivateData;
