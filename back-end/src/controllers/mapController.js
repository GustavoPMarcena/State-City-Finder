import sequelize from "../config/db.js";

const getSVGMap = async (req, res) => {
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    console.log(cidade, estado);
    try {
        
        let pathEstado = await sequelize.query(`SELECT ST_AsSVG(geom) FROM estados WHERE nome ILIKE '${estado}'`, {
            replacements: [estado],  
            type: sequelize.QueryTypes.SELECT
        });

         let pathMunicipio = await sequelize.query(`SELECT ST_AsSVG(geom) FROM municipios WHERE nome ILIKE '${cidade}'`, {
             replacements: [cidade],
             type: sequelize.QueryTypes.SELECT
         });

        let viewBox = await sequelize.query(`SELECT getViewBox('${cidade}')`, {
             replacements: [cidade], 
             type: sequelize.QueryTypes.SELECT
        });

        res.status(200).json({
             pathestado: pathEstado[0].st_assvg,  
             pathmunicipio: pathMunicipio[0].st_assvg,  
             viewBox: viewBox[0].getviewbox  
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao consultar dados no banco de dados' });
    }

}

export default getSVGMap;