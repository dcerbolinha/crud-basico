import React from 'react';
import Authenticated from "@/Layouts/Authenticated";
import {Head, InertiaLink, usePage} from '@inertiajs/inertia-react';

export default function Index(props){
    const { customers } = usePage().props;
    const { flash } = usePage().props

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Clientes</h2>}
            >
            <Head title="Clientes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {flash &&
                            <span>{flash.messageSuccess}</span>
                        }
                        <InertiaLink
                            className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                            href={route("customers.create")}
                        >
                            Adicionar Cliente
                        </InertiaLink>

                        <ul>
                            {customers.map(customer =>(
                                <li key={customer.id}>{customer.name}<InertiaLink
                                    href={route("customers.edit", customer.id)}
                                >
                                    -  Editar
                                </InertiaLink></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </Authenticated>
    );
}
