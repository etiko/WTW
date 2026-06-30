namespace FullStackTest.Data;

public interface IPolicyRepository
{
    IEnumerable<Policy> Get();

    Policy? GetByPolicyNumber(int policyNumber);

    void Add(Policy policy);

    void Update(Policy policy);

    void Remove(int policyNumber);
}