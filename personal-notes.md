Considerations:

move products service to shared module, to be loaded upon succesfull login, instead of eagerly on startup

maybe use a preload strategy of preloading the store-front module

route guarding:

modules will be protected by canload, and all of their children by canActivate (including the ** and '' childs)