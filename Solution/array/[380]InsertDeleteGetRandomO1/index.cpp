/*
 * @lc app=leetcode id=380 lang=cpp
 *
 * [380] Insert Delete GetRandom O(1)
 */

// @lc code=start
class RandomizedSet {
private:
    vector<int> list;
    unordered_map<int, int> map;

public:
    RandomizedSet() {}
    
    bool insert(int val) {
        if (map.find(val) != map.end()) {
            return false;
        }

        list.push_back(val);
        map[val] = list.size() - 1;

        return true;
    }
    
    bool remove(int val) {
        auto it = map.find(val);

        if (it == map.end()) {
            return false;
        }

        auto value = it->second;

        list[value] = list.back();
        list.pop_back();
        map[list[value]] = value;
        map.erase(val);

        return true;
    }
    
    int getRandom() {
        return list[rand() % list.size()];
    }
};
/**
 * Your RandomizedSet object will be instantiated and called as such:
 * RandomizedSet* obj = new RandomizedSet();
 * bool param_1 = obj->insert(val);
 * bool param_2 = obj->remove(val);
 * int param_3 = obj->getRandom();
 */
// @lc code=end

