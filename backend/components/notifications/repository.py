from components.notifications.models import Channel
from typing import List

class ChannelController:

    @classmethod
    async def get_channels(self) -> list:
        channels = await Channel.filter().all()
        channels = channels_to_dict_of_array(channels)
        reversed_list_of_dicts = list(reversed(channels))
        return reversed_list_of_dicts
    
    @classmethod
    async def add_channel(self, payload: dict) -> None:
        await Channel.create(**payload)

    @classmethod
    async def delete_channel(self, channel_id:int) -> None:
        await Channel.filter(id=channel_id).delete()

    
def channels_to_dict_of_array(jobs: List[Channel]) -> List[dict]:
    return [{'id': t.id, 'name': t.name, 'chat_id': t.chat_id} for t in jobs]
