'use client'
import { CreateSubServiceDTO, DisplayServiceDTO } from "@/crud/DTOs";
import { SubService } from "@prisma/client";
import React, { useState } from 'react';

interface CheckoutServicesProps {
    services: DisplayServiceDTO[]
}

const CheckoutServices: React.FC<CheckoutServicesProps> = ({ services }) => {
    const [selectedAddons, setSelectedAddons] = useState<SubService[]>([]);
    const [selectedService, setSelectedService] = useState(services[0]);
    const toggleAddon = (addon: SubService) => {
        if (selectedAddons.includes(addon)) {
            setSelectedAddons(selectedAddons.filter((selected) => selected !== addon));
        } else {
            setSelectedAddons([...selectedAddons, addon]);
        }
    };

    const submitForm = () => {
        // Replace this with your actual form submission logic
        alert('Form submitted with addons: ' + selectedAddons.join(', '));
    };

    function handleServiceChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;
        setSelectedService(services[parseInt(value)])
    }
    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Choose Services</h2>
            {/* Service Dropdown */}
            <div className="mb-4">
                <label htmlFor="services" className="block text-sm font-medium text-gray-700">
                    Select a Service:
                </label>
                <select onChange={handleServiceChange} id="services" name="services" className="mt-1 p-2 border border-gray-300 rounded-md">
                    {services.map((service, index) => (
                        <option key={index} value={index}>{service.title}</option>

                    ))}

                </select>
            </div>
            {/* Addons Visualization */}
            <div className="mb-4">
                {selectedAddons.map((addon, index) => (
                    <div
                        key={index}
                        className="inline-block m-2 p-2 bg-blue-500 text-white rounded cursor-pointer"
                        onClick={() => toggleAddon(addon)}
                    >
                        {addon.title}
                    </div>
                ))}
            </div>

            {/* Addons Checkboxes */}
            <fieldset className=" flex flex-wrap gap-2  mb-4">
                <legend className="block text-sm font-medium text-gray-700">Addons</legend>
                {selectedService.SubServices?.map((subservice, index) => (
                    <div key={index} className="border  rounded-md p-2 cursor-pointer">
                        <label htmlFor={subservice.id} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                id={subservice.id}
                                name={subservice.title}
                                value={subservice.id}
                                className="form-checkbox h-4 w-4 text-blue-500 sr-only"
                                onChange={() => toggleAddon(subservice)}
                            />
                            <span className="ml-2">{subservice.title}</span>
                        </label>
                    </div>

                ))}
                {/* Repeat similar structure for other addons */}
            </fieldset>

            {/* Submit Button */}
            <button onClick={submitForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
            </button>
        </div>
    );
};

export default CheckoutServices;
