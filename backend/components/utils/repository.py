from components.utils.models import Symbol
from typing import List

class UtilsController:

    @classmethod
    async def get_symbols(self) -> list:
        jobs = await Symbol.filter().all()
        jobs = jobs_to_dict_of_array(jobs)
        return jobs
    
    @classmethod
    async def create_symbol(self, payload: dict) -> None:
        await Symbol.create(**payload)

    @classmethod
    async def get_symbols(self) -> list:
        symbols = await Symbol.filter().all()
        symbols = jobs_to_dict_of_array(symbols)
        return symbols

def jobs_to_dict_of_array(jobs: List[Symbol]) -> List[dict]:
    return [{'id': t.id, 'name': t.name} for t in jobs]
