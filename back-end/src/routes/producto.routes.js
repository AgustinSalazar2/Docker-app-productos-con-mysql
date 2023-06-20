const router = require('express').Router()

import { getProducts, postProducts, putProduts, deleteProduts } from '../controllers/producto.controller';

router.get('/product', getProducts);

router.post('/product', postProducts);

// router.put('/product/:id', putProduts);

// router.delete('/product/:id', deleteProduts);

export default router;