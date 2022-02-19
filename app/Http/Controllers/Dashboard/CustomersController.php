<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Customers;
use Cassandra\Custom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CustomersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Customers/Index', ["teste" => 'teste']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Customers/Create');
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255'],
        ]);

        $customer = Customers::create([
            'name' => $request->input('name')
        ]);

        return Redirect::route('customers.edit', $customer->id)->with('messageSuccess', 'Sucesso');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $customer = Customers::find($id);

        return Inertia::render('Customers/Edit', [
            'id' => $customer->id,
            'name' => $customer->name
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255'],
        ]);

        $customer = Customers::find($id);
        $customer->update([
            'name' => $request->input('name')
        ]);


        return Redirect::route('customers.edit', $customer->id)->with('messageSuccess', 'Sucesso');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
