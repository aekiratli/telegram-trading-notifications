from components.utils.models import Symbol
from typing import List
from tortoise import Tortoise
from tortoise.transactions import atomic

class UtilsController:

    @classmethod
    async def get_symbols(self) -> list:
        jobs = await Symbol.filter().all()
        jobs = jobs_to_dict_of_array(jobs)
        return jobs
    
    @classmethod
    @atomic()
    async def create_symbols(self, symbols: List[dict]) -> None:
        
        existing_symbols = await self.get_symbols()
        existing_symbols = [item['name'] for item in existing_symbols]

        if len(symbols) == 0:
            conn = Tortoise.get_connection("default")
            await conn.execute_query(f'TRUNCATE TABLE symbol')
            return

        for symbol in symbols:
            if symbol in existing_symbols:
                pass
            else:
                await Symbol.create(**{"name": symbol})

        for existing_symbol in existing_symbols:
            if existing_symbol not in symbols:
                await Symbol.filter(name=existing_symbol).delete()

    @classmethod
    async def get_symbols(self) -> list:
        symbols = await Symbol.filter().all()
        symbols = jobs_to_dict_of_array(symbols)
        return symbols
    
    @classmethod
    async def get_symbol_by_id(self,symbol_id) -> Symbol:
        symbol= await Symbol.get(id=symbol_id)
        return symbol

def jobs_to_dict_of_array(jobs: List[Symbol]) -> List[dict]:
    return [{'id': t.id, 'name': t.name} for t in jobs]
