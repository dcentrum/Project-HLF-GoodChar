var FabricSdkService =require('./FabricSdkService');
module.exports = {
    userValidation: async (req, res, next) => {
        try {
            let status = await FabricSdkService.setUser(req.fabricClient, 'user1');
            if (status === true) {
                next();
                console.log('user loaded')
            }
        } catch (e) {
            console.log('Error :', e);
            return res.status(400).send({
                status: false,
                response: "Invalid user"
            });
        }
    }
}