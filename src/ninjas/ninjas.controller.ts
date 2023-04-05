import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService) {}
    // GET /ninjas --> []
    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
        return this.ninjasService.getNinjas(weapon)
    }
    // GET /ninjas/:id --> { ... }
    @Get(':id')
    getOneNinja(@Param('id') id: string) {
        try {
            return this.ninjasService.getOneNinja(parseInt(id))
        } catch(err) {
            throw new NotFoundException()
        }
    }
    // POST /ninjas
    @Post()
    createNinja(@Body() createNinjaDto: CreateNinjaDto) {
        return this.ninjasService.createNinja(createNinjaDto)
    }
    // PUT /ninjas/:id --> { ... }
    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
        return this.ninjasService.updateNinja(parseInt(id), updateNinjaDto)
    }
    // DELETE /ninjas/:id
    @Delete(':id')
    deleteNinja(@Param('id') id: string) {
        return this.ninjasService.deleteNinja(parseInt(id))
    }
}
