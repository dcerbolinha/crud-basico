import React, {useState, useEffect} from 'react';
import Authenticated from "@/Layouts/Authenticated";
import {Head, useForm, usePage} from '@inertiajs/inertia-react';
import ValidationErrors from "@/Components/ValidationErrors";
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import {Inertia} from "@inertiajs/inertia";


export default function Edit(props){
    const { flash } = usePage().props

    const { data, setData, put} = useForm({
        id: props.id || '',
        name: props.name || '',
        url_site: props.url_site || '',
        url_logo: props.url_logo || ''
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };


    const submit = (e) => {
        e.preventDefault();
        // Inertia.put(route('customers.update', data), data, {
        //     forceFormData: true,
        // })
        Inertia.put( `/dashboard/customers/{$data.id}`, data);

        //put(route('customers.update', data), data.id);
    };


    const destroy = (e) => {
        if (confirm("Tem certeza que deseja excluir esse cliente?")) {
            Inertia.delete(route("customers.destroy", data.id));
        }
    }

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
                            <input
                                type="hidden"
                                name="id"
                                value={data.id}
                            />
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Nome
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={data.name}
                                                onChange={onHandleChange}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-3 sm:col-span-2">
                                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                Site
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                              http://
                                            </span>
                                                <input
                                                    type="text"
                                                    name="url_site"
                                                    id="url_site"
                                                    value={data.url_site}
                                                    onChange={onHandleChange}
                                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                    placeholder="www.example.com"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Logo</label>
                                        <div className="mt-1 flex items-center">
                                      <span className="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                                          {data.url_logo
                                              ?
                                              <img
                                                  src={data.url_logo}
                                                  className="h-full w-full text-gray-300"
                                                  alt=""
                                              />
                                              :
                                              <svg className="h-full w-full text-gray-300" fill="currentColor"
                                                   viewBox="0 0 24 24">
                                                  <path
                                                      d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                                              </svg>
                                          }
                                      </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Upload Logo</label>
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                {data.url_preview
                                                    ?
                                                    <img
                                                        src={URL.createObjectURL(data.url_preview)}
                                                        className="mx-auto h-20 w-20 text-gray-400"
                                                        alt=""
                                                    />
                                                    :
                                                    <svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                }

                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="photo"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                    >
                                                        <span>Selecionar imagem</span>
                                                        <input
                                                            id="photo"
                                                            name="photo"
                                                            type="file"
                                                            className="sr-only"
                                                            onChange={e => setData('url_logo', e.target.files[0])}
                                                        />
                                                    </label>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-4">
                                    <button
                                        onClick={destroy}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Deletar
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Salvar
                                    </button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
