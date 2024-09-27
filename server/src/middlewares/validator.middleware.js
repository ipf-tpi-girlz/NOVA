export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        const errorMessages = error.errors.map(err => err.message);
        return res.status(400).json(errorMessages);
    }
}
