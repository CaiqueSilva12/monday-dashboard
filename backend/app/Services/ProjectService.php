<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Support\Facades\DB;

class ProjectService
{
    /**
     * Get total number of projects.
     */
    public function getTotalProjects(): int
    {
        return Project::count();
    }

    /**
     * Get number of projects created per month (for chart).
     * Returns array: [ ['month' => '2025-07', 'count' => 5], ... ]
     */
    public function getMonthlyProjectCounts(): array
    {
        return Project::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->toArray();
    }
} 