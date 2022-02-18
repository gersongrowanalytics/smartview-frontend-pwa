export const COLUMN_GROUP = [
    {
      Header: 'Item',
      accessor: 'proid',
      Aggregated: ({ value }) => `${value} Names`,
    },
    {
        Header: 'SKU',
        accessor: 'prosku',
        Aggregated: ({ value }) => `${value} Names`,
    },
    {
        Header: 'Nombre',
        accessor: 'pronombre',
        Aggregated: ({ value }) => `${value} Names`,
    },
    {
        Header: 'Categoria',
        accessor: 'catnombre',
        Aggregated: ({ value }) => `${value} Names`,
    },
    {
        Header: 'Fecha Inicio',
        accessor: 'created_at',
        Aggregated: ({ value }) => `${value} Names`,
    },
    {
        Header: 'Fecha Final',
        accessor: 'updated_at',
        Aggregated: ({ value }) => `${value} Names`,
    },
    {
        Header: 'Imagen Producto',
        accessor: 'proimagen',
        Aggregated: ({ value }) => `${value} Names`,
        Cell: ({ row }) => {
            return (
             
                  <img src={row.original.proimagen} style={{height: "78px"}}></img>
             
            );
        },
    }
]