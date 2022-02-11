import React from 'react';
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm } from '@inertiajs/inertia-react';
import ValidationErrors from "@/Components/ValidationErrors";
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';

export default function Create(props){

    const {data, setData, post, processing, errors, reset } = useForm({
        name: ''
    })

    const onHandleChange = (event) =>{
        setData(event.target.name, event.target.value);
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('customers'));
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Adicionar Cliente</h2>}
        >

        <Head title="Adicionar Cliente"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <ValidationErrors errors={errors} />
                        <form onSubmit={submit}>
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
                            <div className="flex items-center justify-end mt-4">
                                <Button className="ml-4" processing={processing}>
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
