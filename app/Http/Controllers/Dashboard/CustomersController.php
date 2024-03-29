<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Customers;
use App\Models\User;
use Cassandra\Custom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CustomersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $customers = Customers::all();
        return Inertia::render('Customers/Index', ['customers' => $customers]);
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

        $request->validate([
            'name' => ['required', 'max:255'],
        ]);

        $imageName = time().'.'.$request->url_logo->extension();
        $request->url_logo->storeAs('public', $imageName);

        $userID = Auth::id();

        $customer = Customers::create([
            'name' => $request->name,
            'url_site' => $request->url_site,
            'url_logo' => $imageName,
            'created_by' => $userID,
            'updated_by' => $userID,
            'excluded' => false
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
    public function edit(Customers $customer)
    {

        return Inertia::render('Customers/Edit', [
            'id' => $customer->id,
            'name' => $customer->name,
            'url_site' => $customer->url_site,
            'url_logo' => asset('storage/'.$customer->url_logo)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customers $customer)
    {


        $request->validate([
            'name' => ['required', 'max:255'],
        ]);

        $imageName = $request->url_logo;
        if(!is_string($request->url_logo)){
            $imageName = time().'.'.$request->url_logo->extension();
            $request->url_logo->storeAs('public', $imageName);
        }

        $userID = Auth::id();

        $customer->update([
            'name' => $request->name,
            'url_site' => $request->url_site,
            'url_logo' => $imageName,
            'created_by' => $userID,
            'updated_by' => $userID,
            'excluded' => false
        ]);


        return Redirect::route('customers.edit', $customer->id)->with('messageSuccess', 'Sucesso');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customers $customer)
    {
        $customer->delete();
        return Redirect::route('customers.index')->with('messageSuccess', 'Deletado com Sucesso');
    }
}
