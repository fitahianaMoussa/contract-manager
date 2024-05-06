<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithStartRow;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use App\Models\Client;
use App\Models\Contract;
use App\Models\Product;

class ClientImportClass implements ToCollection, WithStartRow
{
    protected $user_id;

    public function __construct($user_id)
    {
        $this->user_id = $user_id;
    }

    public function collection(Collection $rows)
    {
        foreach ($rows as $row) 
        {

            $product = (Product::where('name', $row[10])->get())->first();

            $client = Client::create([
                'first_name' => $row[0],
                'last_name' => $row[1],
                'date_of_birth' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject(intval($row[2])),
                'social_security_number' => $row[3],
                'email' => $row[4],
                'phone' => $row[5],
                'street' => $row[6],
                'city' => $row[7],
                'country' => $row[8],
                'zip_code' => $row[9],
                'broker_id' => $this->user_id,
                'is_valid' => true,
            ]);
            
            Contract::create([
                    'client_id' => $client->id,
                    'start_date' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject(intval($row[11])),
                    'end_date' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject(intval($row[12])),
                    'product_id' => $product->id,
                    'amount' => intval($row[13])
            ]);

        }
    }

    /**
     * @return int
     */
    public function startRow(): int
    {
        return 2;
    }
}
