namespace FullStackTest.Data;

public class Policy
{
    public int PolicyNumber { get; set; }

    public PolicyHolder? PolicyHolder { get; set; } = null;
}