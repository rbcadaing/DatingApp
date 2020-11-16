namespace API.Helpers
{
    public class PaginationParams
    {
         private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            // set value to max page size if user set the value greater than the max page size
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

    }
}