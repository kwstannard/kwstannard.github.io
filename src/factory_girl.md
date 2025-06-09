# FactoryGirl associations without callbacks

Given a posts.rb factory:

``` ruby
factory :post do
  user
  text "hello"
end
```

Following the [guide](https://github.com/thoughtbot/factory_girl/blob/master/GETTING_STARTED.md#associations) you would do this:

``` ruby
factory :user do
  name "bob"

  transient do
    post_count 1
  end

  after(:create) do |user, evaluator|
    create_list(:post, post_count, user: user, text: "#{user.name} is cool")
  end
end
```

This is alright, but leads to issues. For example, if you merely build a user, then that user will not have any posts.

```
>> FactoryGirl.build(:user).posts.size
=> 0
>> FactoryGirl.create(:user).posts.size
=> 2
```

Also, in a more complex association structure it can be hard to access posts.

``` ruby
factory :oeuvre do
  after(:create) do |oeuvre, evaluator|
    user = build :user
    posts = create_list(:posts, 2, user: user)
    replies = create_list(:replies, 2, user: user)
    oeuvre.works.push *posts
    oeuvre.works.push *replies
  end
end
```

# A better way

An [under-documented fact about attribute blocks](https://github.com/thoughtbot/factory_girl/blob/master/GETTING_STARTED.md#dependent-attributes) is that self is the evaluator object from the after create block. This allows you to call any transient, attribute, or association on the factory.

``` ruby
factory :user do
  name "bob"
  posts { build_list(:post, post_count, user: nil, text: "#{name} is cool") }
  replies { build_list(:reply, reply_count, user: nil, text: "#{name} is cool") }

  transient do
    post_count 1
    reply_count 1
  end
end

factory :oeuvre do
  user { build :user }
  works { user.posts + user.replies }
end
```

As you can see above, the oeuvre factory is now much simpler. In addition build now gives the correct sizes.

```
>> FactoryGirl.build(:user).posts.size
=> 2
>> FactoryGirl.create(:user).posts.size
=> 2
```

Last but not least, creating objects with association blocks as opposed to after create blocks is significantly faster:

``` ruby
factory :user_a, class: 'User' do
  after(:create) {|u,e| create_list(:post, 2, user: u) }
end

factory :user_b do
  posts { build_list(:post, 2, user: nil) }
end

factory :post do
  user
end

Benchmark.ips {|r|
  r.report("after create") { FactoryGirl.create :user_a }
  r.report("assn create") { FactoryGirl.create :user_b }
  r.report("assn build") { FactoryGirl.build :user_b }
}
```

```
Warming up --------------------------------------
        after create     3.000  i/100ms
         assn create     8.000  i/100ms
          assn build   207.000  i/100ms
Calculating -------------------------------------
        after create     35.724  (±22.4%) i/s -    171.000  in   5.040311s
         assn create     91.368  (±17.5%) i/s -    448.000  in   5.049313s
          assn build      2.061k (± 1.7%) i/s -     10.350k in   5.023673s
```
