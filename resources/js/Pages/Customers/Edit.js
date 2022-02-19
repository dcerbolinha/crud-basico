import React, {useState, useEffect} from 'react';
import Authenticated from "@/Layouts/Authenticated";
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import ValidationErrors from "@/Components/ValidationErrors";
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';


export default function Edit(props){
    const { flash } = usePage().props
    const { data, setData, put, processing, errors, reset } = useForm({
        id: props.id || '',
        name: props.name || ''
    });


    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('customers.update', data), data.id);
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Cliente</h2>}
        >

            <Head title="Editar Cliente"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        {flash &&
                            <span>{flash.messageSuccess}</span>
                        }
                        <form onSubmit={submit}>
                            <Input
                                type="hidden"
                                name="id"
                                value={data.id}
                            />
                            <div>
                                <Label forInput="name" value="Nome" />
                                <Input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                />
                            </div>
                            {errors.name &&
                                <span>{errors.name}</span>
                            }
                            <div className="flex items-center justify-end mt-4">
                                <Button className="ml-4">
                                    Enviar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
