<?php

use Tabuna\Breadcrumbs\Breadcrumbs;
use Tabuna\Breadcrumbs\Trail;

// Dashboard
Breadcrumbs::for('dashboard', fn(Trail $trail) =>
    $trail->push('Dashboard', route('dashboard'))
);

// Teams
Breadcrumbs::for('teams.index', fn(Trail $trail) =>
    $trail->parent('dashboard')
    ->push('Teams', route('teams.index'))
);

Breadcrumbs::for('teams.show', fn(Trail $trail, $team) =>
    $trail->parent('teams.index')
    ->push(App\Models\Team::findOrFail($team)->name, route('teams.show', $team))
);

Breadcrumbs::for('teams.create', fn(Trail $trail) =>
    $trail->parent('teams.index')
    ->push('Create', route('teams.create'))
);

// User Profile
Breadcrumbs::for('profile.show', fn(Trail $trail) =>
    $trail->push('My profile', route('profile.show'))
);

Breadcrumbs::for('user.chats', fn(Trail $trail) =>
    $trail->push('My chats', route('user.chats'))
);
