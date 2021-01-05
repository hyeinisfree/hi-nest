import { Controller, Get, Param, Post, Delete, Put, Patch, Body, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movies.entity';
import { create } from 'domain';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') movieId: string): Movie {
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData) {
        return this.moviesService.create(movieData);
    }

    @Delete(':id')
    remove(@Param('id') movieId: string) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch(':id')
    path(@Param('id') movieId: string, @Body() updateData) {
        return this.moviesService.update(movieId, updateData);
    }
}