import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

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
    getOneNinja(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.ninjasService.getOneNinja(id)
        } catch(err) {
            throw new NotFoundException()
        }
    }
    // POST /ninjas
    @Post()
    @UseGuards(BeltGuard)
    createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
        return this.ninjasService.createNinja(createNinjaDto)
    }
    // PUT /ninjas/:id --> { ... }
    @Put(':id')
    updateNinja(@Param('id', ParseIntPipe) id: number, @Body() updateNinjaDto: UpdateNinjaDto) {
        return this.ninjasService.updateNinja(id, updateNinjaDto)
    }
    // DELETE /ninjas/:id
    @Delete(':id')
    deleteNinja(@Param('id', ParseIntPipe) id: number) {
        return this.ninjasService.deleteNinja(id)
    }
}
