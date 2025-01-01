import { Controller, Get, Post, Put, Delete, Param, Body, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    async create(
        @Body() createCustomerDto: { firstname: string; lastname: string; email: string; password: string },
        @Res() res: Response,
    ): Promise<any> {
        try {
            const existingCustomer = await this.customerService.findByEmail(createCustomerDto.email);
            if (existingCustomer) {
                return res.status(400).json({ message: 'Customer with this email already exists' });
            }

            const newCustomer = await this.customerService.create(createCustomerDto);

            const transformedUser = {
                ...newCustomer.toObject(),
                id: newCustomer._id,
            };
            delete transformedUser._id;

            return res.status(201).json(transformedUser);
        } catch (error) {
            console.error('Error creating customer:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get()
    async findAll(@Res() res: Response, @Query('_page') page: string, @Query('_limit') limit: string): Promise<any> {
        try {
            const pageNumber = parseInt(page, 10) || 1;
            const limitNumber = parseInt(limit, 10) || 10;
            const skip = (pageNumber - 1) * limitNumber;

            const totalCustomers = await this.customerService.count();

            const customers = await this.customerService.findAll(skip, limitNumber);

            const transformedCustomers = customers.map((customer) => ({
                ...customer.toObject(),
                id: customer._id,
            }));

            // Установка заголовков для клиента
            res.setHeader('X-Total-Count', totalCustomers.toString());
            res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

            return res.json(transformedCustomers);
        } catch (error) {
            console.error('Error fetching customers:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get(':id')
    async findById(@Param('id') id: string, @Res() res: Response): Promise<any> {
        try {
            const customer = await this.customerService.findById(id);
            if (!customer) {
                return res.status(404).json({ message: 'Customer user not found' });
            }

            const transformedUser = {
                ...customer.toObject(),
                id: customer._id,
            };

            return res.json(transformedUser);
        } catch (error) {
            console.error('Error fetching customer:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCustomerDto: Partial<{ firstname: string; lastname: string; email: string; password: string; isActive: boolean }>,
        @Res() res: Response,
    ): Promise<any> {
        try {
            const updatedCustomer = await this.customerService.update(id, updateCustomerDto);
            if (!updatedCustomer) {
                return res.status(404).json({ message: 'Customer is not found' });
            }

            return res.json(updatedCustomer);
        } catch (error) {
            console.error('Error updating customer:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Res() res: Response): Promise<any> {
        try {
            const deletedCustomer = await this.customerService.delete(id);
            if (!deletedCustomer) {
                return res.status(404).json({ message: 'Customer user not found' });
            }

            return res.json({ message: 'Customer deleted successfully' });
        } catch (error) {
            console.error('Error deleting customer:', error.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}