from components.api.telegram_api import TelegramApiController

async def trade_created_handler(**context):
    trade = context["instance"]
    chat_ids = context["chat_ids"]
    symbol = context["symbol"]
    risk = context["request_payload"]["risk"]
    market = context["request_payload"]["market"]
    if market == 'buy':
        status = "🟢"
    else:
        status = "🔴"
    price = context["request_payload"]["price"]
    msg = f"New Order for {symbol.name}.\n-----------------------------------\nSide: {status} - Price: {price} - Risk: {risk.upper()}"
    msg_ids = await TelegramApiController(chat_ids,'trade').send_message(msg)
    trade.telegram_msg_info = msg_ids
    await trade.save()

async def trade_deleted_handler(**context):
    trade = context["instance"]
    for msg in trade.telegram_msg_info:
        await TelegramApiController([],'trade').delete_message(msg["chat_id"],msg["msg_id"])
