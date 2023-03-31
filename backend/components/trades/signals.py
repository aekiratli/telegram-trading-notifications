async def trade_created_handler(**context):
    print(context["instance"].id, "Should buying or selling stuff")

async def trade_deleted_handler(**context):
    print(context["instance"].id, "Removing stuff")