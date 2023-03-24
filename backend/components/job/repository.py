# from components.counter.models import Counter

# class CounterController:

#     @classmethod
#     async def get_counter(self, user_id: int) -> int:
#         counter = await Counter.get(user_id=user_id)
#         return counter
    
#     @classmethod
#     async def increment_counter(self, user_id: int) -> None:
#         counter = await Counter.get(user_id=user_id)
#         counter.how_many_logged_in = counter.how_many_logged_in + 1
#         await counter.save()