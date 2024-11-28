
const getSVGMap = (req, res) => {
    const cidade = req.body.cidade;
    const estado = req.body.estado;

    console.log(cidade, estado);
    res.status(200).json({message: "legal ein"});
}

export default getSVGMap;