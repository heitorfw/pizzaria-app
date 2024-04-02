import {Router} from 'express'
import  multer  from 'multer';

//user controllers
import { CreateUserController } from './controllers/User/CreateUserController';
import { AuthUserController } from './controllers/User/AuthUserController';
import { DetailUserController } from './controllers/User/DetailUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';

//-category controllers
import { CreateCategoryController } from './controllers/Category/CreateCategoryController';
import { ListCategoryController } from './controllers/Category/ListCategoryController';

// product controllers
import uploadConfig from './config/multer'

import { ListByCategoryController } from './controllers/Product/ListByCategoryController';
import { CreateProductController } from './controllers/Product/CreateProductController';

//order controllers

import { CreateOrderController } from './controllers/Order/CreateOrderController';
import { RemoveOrderController } from './controllers/Order/RemoveOrderController';
import { AddItemController } from './controllers/Order/AddItemController';
import { RemoveItemController } from './controllers/Order/RemoveItemController';
import { SendOrderController } from './controllers/Order/SendOrderController';
import { ListOrderController } from './controllers/Order/ListOrderController';
import { DetailOrderController } from './controllers/Order/DetailOrderController';
import { FinishOrderController } from './controllers/Order/FinishOrderController';

const router = Router();

const upload =  multer(uploadConfig.upload("./images"))

//- rotas user
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

//rotas  category
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle )

// rotas product
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle )
router.get('/product/category', isAuthenticated, new ListByCategoryController().handle)

//rotas order
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/item', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle )
router.get ('/order', isAuthenticated, new ListOrderController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

export{router};